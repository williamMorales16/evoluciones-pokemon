import { APIRequestContext, APIResponse } from "playwright/test";


export class GetPokemonDataService {

    private endpoint: string = '/pokemon/';

    constructor(
        private readonly apiContext: APIRequestContext,
        private readonly baseURL: string,
    ) { 
        if (!this.baseURL) {
            throw new Error('POKEMON_API_URL is not defined in environment variables');
        }
    }
    async getPokemonData(pokemonName: string): Promise<APIResponse> {
        const url = `${this.baseURL}${this.endpoint}${pokemonName}`;
        return await this.apiContext.get(url.toString());
    }
}
