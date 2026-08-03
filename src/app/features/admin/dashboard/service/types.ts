export type hourlyOptionsType={

    tooltip:{

        trigger:'axis'

    },

    xAxis:{

        type:'category',

        data:string[]

    },

    yAxis:{

        type:'value'

    },

    series:chartSeriType[]
}

export type pieChartType={

    tooltip:{

        trigger:'item'

    },

    series:chartSeriType[]

}

type chartDataType=Array<{
     value:number,
    name:string}>|Array<number>

type chartSeriType={

            type?:'pie'|'line'|'',

            radius?:string//'70%',

            data:chartDataType,

            smooth?:boolean
             }

export const setPieChart=(data:chartDataType,radius:string,tooltypeTrigger:'item')=>{
   
    const content:pieChartType={
    tooltip:{
        trigger:tooltypeTrigger
    },
    series:[
        {
            radius,
            type:"pie",
            data
        }
    ]
}

return content
}