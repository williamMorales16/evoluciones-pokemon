export class PokemonUtils {
    
    static orderSpeciesByName(speciesList: any[]): string[] {
        const listLength = speciesList.length;
        const copyList = [...speciesList]; 

        for (let i = 0; i < listLength; i++) {
            for (let j = 0; j < listLength - i - 1; j++) {
            // Comparación directa de strings (Unicode)
            if (copyList[j] > copyList[j + 1]) {
                // Intercambio de elementos
                let temp = copyList[j];
                copyList[j] = copyList[j + 1];
                copyList[j + 1] = temp;
            }
            }
        }
        return copyList
    }
}