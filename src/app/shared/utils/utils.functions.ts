export const formedSelectOptions=(optionLabels:any[],optionValues:any[])=>{
   const options= optionLabels.map((key,index)=>{
        return {label:key,value:optionValues[index]} as any
    })
    return options
}
// 1. Définition du décorateur (une fonction standard)
export function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`L'action "${propertyKey}" a été appelée avec les arguments :`, args);
        return originalMethod.apply(this, args); // Exécution de la méthode d'origine
    };
}