export const formedSelectOptions=(optionLabels:any[],optionValues:any[])=>{
   const options= optionLabels.map((key,index)=>{
        return {label:key,value:optionValues[index]} as any
    })
    return options
}