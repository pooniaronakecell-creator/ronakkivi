export function calculate(items){
 let paise=0,missing=0;
 for(const i of items){
 if(i.quantity===null||i.rate===null||!Number.isFinite(i.quantity)||!Number.isFinite(i.rate)||i.quantity<0||i.rate<0){missing++;continue;}
 paise+=Math.round(i.quantity*Math.round(i.rate*100));
 }
 return {amount:paise/100,missing};
}
export function pricing(items,discount=0,tax=0){
 if(!Number.isFinite(discount)||discount<0||discount>100||!Number.isFinite(tax)||tax<0||tax>100)throw Error('Percentages must be between 0 and 100.');
 const base=calculate(items),subtotal=Math.round(base.amount*100),deduction=Math.round(subtotal*discount/100),taxable=subtotal-deduction,taxPaise=Math.round(taxable*tax/100);
 return {...base,subtotal:subtotal/100,discount:deduction/100,tax:taxPaise/100,total:(taxable+taxPaise)/100};
}
