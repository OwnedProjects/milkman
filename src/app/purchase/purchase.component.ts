import { Component, OnInit, Input } from "@angular/core";
import * as moment from "moment";
import { RestService } from "../rest.service";

@Component({
  selector: "app-purchase",
  templateUrl: "./purchase.component.html",
  styleUrls: ["./purchase.component.css"],
})
export class PurchaseComponent implements OnInit {
  msgtext: string = null;
  msgclass: string = null;
  purDate: any = null;
  purTime: string = "1";
  stockbuffaloqty: any = 0;
  stockcowqty: any = 0;
  supplierName: string = null;
  allsuppdata: any = null;
  constructor(private _rest: RestService) {}

  ngOnInit(): void {
    this.resetForm();
    //this.getSuppliers();
    this.getAllClientsByType();
    this.getAllStocks();
  }

  getAllClientsByType() {
    let geturl = "ctype=1";
    let _this = this;
    return new Promise(function (resolve, reject) {
      _this._rest
        .getData("client.php", "getAllClientsByType", geturl)
        .subscribe((Response) => {
          console.log(Response);
          if (Response && Response["data"]) {
            _this.allsuppdata = Response["data"];
            // This is dynamic qty added to use by later;
            for (let i in _this.allsuppdata) {
              _this.allsuppdata[i].buffaloqty = 0;
              _this.allsuppdata[i].cowqty = 0;
              _this.allsuppdata[i].amount = 0;
            }
            resolve(true);
          } else {
            reject(false);
          }
          _this = null;
        });
    });
  }

  addPurchase() {
    let dt = new Date(this.purDate);
    dt.setHours(0, 0, 0, 1);
    let totalbuffqty = 0,
      totalcowqty = 0;
    for (let i in this.allsuppdata) {
      totalbuffqty += parseFloat(this.allsuppdata[i].buffaloqty);
      totalcowqty += parseFloat(this.allsuppdata[i].cowqty);
    }
    if (
      parseFloat(this.stockbuffaloqty) - totalbuffqty < 0 ||
      parseFloat(this.stockcowqty) - totalcowqty < 0
    ) {
      this.msgclass = "danger";
      this.msgtext =
        "Your total order cannot be greater than available stock...";
      this.timer();
      return;
    }
    let tmpobj = {
      purchdate: dt.getTime(),
      purchtime: this.purTime,
      suppdata: this.allsuppdata,
      buffalostkqty: parseFloat(this.stockbuffaloqty) + totalbuffqty,
      cowstkqty: parseFloat(this.stockcowqty) + totalcowqty,
    };
    console.log(this.stockbuffaloqty);
    console.log(tmpobj);
    this._rest.postData("purchase.php", "addPurchase", tmpobj).subscribe(
      (Response) => {
        console.log(this.stockbuffaloqty);
        this.msgtext = "Purchase successful.";
        this.msgclass = "success";
        this.getAllStocks();
        this.timer();
        this.resetForm();
      },
      (err) => {
        this.msgtext = "Purchase Failed.";
        this.msgclass = "danger";
        this.timer();
        this.resetForm();
      }
    );
  }

  getAllStocks() {
    this._rest.getData("stocks.php", "getAllStocks").subscribe((Response) => {
      if (Response && Response["data"]) {
        let data = Response["data"];
        for (let i in data) {
          if (data[i].stockid.toString() === "1") {
            this.stockcowqty = data[i].quantity;
          }
          if (data[i].stockid.toString() === "2") {
            this.stockbuffaloqty = data[i].quantity;
          }
        }
      }
    });
  }

  timer() {
    let _this = this;
    setTimeout(() => {
      _this.msgclass = null;
      _this.msgtext = null;
    }, 2000);
  }

  resetForm() {
    let dt = moment(new Date(), "YYYY-MM-DD");
    this.purDate = dt.format("YYYY-MM-DD");
  }
  calculateAmount(supp, index) {
    supp.amount =
      parseFloat(supp.buffaloqty) * parseFloat(supp.buffalorate) +
      parseFloat(supp.cowqty) * parseFloat(supp.cowrate);
  }
}
