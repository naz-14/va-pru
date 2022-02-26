"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiStockController = void 0;
const woocommerceConnection_1 = __importDefault(require("../../services/woocommerceConnection"));
const resp = {
    name: 'boItemWharehause',
    key: '4040203090',
    result: [
        {
            itemCode: '7615',
            whsCode: '010',
            onHand: 0.0,
            isCommited: 48.0,
            onOrder: 0.0,
            consig: 0.0,
            counted: 0.0,
            wasCounted: 'N',
            userSign: 1,
            minStock: 0.0,
            maxStock: 0.0,
            minOrder: 0.0,
            avgPrice: 0.0,
            locked: 'N',
            balInvntAc: '',
            saleCostAc: '',
            transferAc: '',
            revenuesAc: '',
            varianceAc: '',
            decreasAc: '',
            increasAc: '',
            returnAc: '',
            expensesAc: '',
            euRevenuAc: '',
            euExpensAc: '',
            frRevenuAc: '',
            frExpensAc: '',
            exmptIncom: '',
            priceDifAc: '',
            exchangeAc: '',
            balanceAcc: '',
            purchaseAc: '',
            paReturnAc: '',
            purchOfsAc: '',
            shpdGdsAct: '',
            vatRevAct: '',
            stockValue: 40,
            decresGlAc: '',
            incresGlAc: '',
            stokRvlAct: '',
            stkOffsAct: '',
            wipAcct: '',
            wipVarAcct: '',
            costRvlAct: '',
            cstOffsAct: '',
            expClrAct: '',
            expOfstAct: '',
            object: '31',
            logInstanc: null,
            createDate: '2020-10-26T00:00:00',
            userSign2: 1,
            updateDate: '2021-11-08T00:00:00',
            arcmAct: '',
            arcmFrnAct: '',
            arcmeuAct: '',
            arcmExpAct: '',
            apcmAct: '',
            apcmFrnAct: '',
            apcmeuAct: '',
            revRetAct: '',
            negStckAct: '',
            stkInTnAct: '',
            purBalAct: '',
            whICenAct: '',
            whOCenAct: '',
            wipOffset: '',
            stockOffst: '',
            dftBinAbs: null,
            dftBinEnfd: 'N',
            freezed: 'N',
            freezeDoc: null,
            freeChrgSA: null,
            freeChrgPU: null,
        },
        {
            itemCode: '4175',
            whsCode: '010',
            onHand: 0.0,
            isCommited: 48.0,
            onOrder: 0.0,
            consig: 0.0,
            counted: 0.0,
            wasCounted: 'N',
            userSign: 1,
            minStock: 0.0,
            maxStock: 0.0,
            minOrder: 0.0,
            avgPrice: 0.0,
            locked: 'N',
            balInvntAc: '',
            saleCostAc: '',
            transferAc: '',
            revenuesAc: '',
            varianceAc: '',
            decreasAc: '',
            increasAc: '',
            returnAc: '',
            expensesAc: '',
            euRevenuAc: '',
            euExpensAc: '',
            frRevenuAc: '',
            frExpensAc: '',
            exmptIncom: '',
            priceDifAc: '',
            exchangeAc: '',
            balanceAcc: '',
            purchaseAc: '',
            paReturnAc: '',
            purchOfsAc: '',
            shpdGdsAct: '',
            vatRevAct: '',
            stockValue: 54,
            decresGlAc: '',
            incresGlAc: '',
            stokRvlAct: '',
            stkOffsAct: '',
            wipAcct: '',
            wipVarAcct: '',
            costRvlAct: '',
            cstOffsAct: '',
            expClrAct: '',
            expOfstAct: '',
            object: '31',
            logInstanc: null,
            createDate: '2020-10-26T00:00:00',
            userSign2: 1,
            updateDate: '2021-11-08T00:00:00',
            arcmAct: '',
            arcmFrnAct: '',
            arcmeuAct: '',
            arcmExpAct: '',
            apcmAct: '',
            apcmFrnAct: '',
            apcmeuAct: '',
            revRetAct: '',
            negStckAct: '',
            stkInTnAct: '',
            purBalAct: '',
            whICenAct: '',
            whOCenAct: '',
            wipOffset: '',
            stockOffst: '',
            dftBinAbs: null,
            dftBinEnfd: 'N',
            freezed: 'N',
            freezeDoc: null,
            freeChrgSA: null,
            freeChrgPU: null,
        },
    ],
};
const MultiStockController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let skuList = '';
        let produtsUpdate = [];
        const data = req.body.result;
        for (const item of resp.result) {
            // warehouse code
            if (item.whsCode == '010') {
                skuList = skuList + `${item.itemCode},`;
            }
        }
        const productsBySku = yield woocommerceConnection_1.default.get(`products/?sku=${skuList}`);
        if (productsBySku.status !== 200) {
            throw new Error('Products not already exist');
        }
        for (const item of productsBySku.data) {
            let stock = null;
            resp.result.forEach((prodSap) => {
                if (prodSap.itemCode == item.sku) {
                    stock = prodSap.stockValue;
                }
            });
            if (stock) {
                produtsUpdate.push({
                    id: item.id,
                    stock_quantity: stock,
                });
            }
        }
        const productsUpdateWoo = yield woocommerceConnection_1.default.post('products/batch', {
            update: produtsUpdate,
        });
        if (productsUpdateWoo.status !== 200) {
            throw new Error('Update error');
        }
        return res.status(200).json('Product stock updated sucessfull');
    }
    catch (error) {
        return {
            status: false,
            error: error,
        };
    }
});
exports.MultiStockController = MultiStockController;
