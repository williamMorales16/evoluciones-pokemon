import { APIRequestContext, APIResponse } from "playwright";

export class GetEvolutionChainService {

    private endpoint: string = '/evolution-chain/';

    constructor(
        private readonly apiContext: APIRequestContext,
        private readonly baseURL: string,
    ) { 
        if (!this.baseURL) {
            throw new Error('POKEMON_API_URL is not defined in environment variables');
        }
    }

    async getEvolutionChain(evolutionChainId: number): Promise<APIResponse> {
        const url = `${this.baseURL}${this.endpoint}${evolutionChainId}`;
        console.log(`Making GET request to: ${url}`);
        return await this.apiContext.get(url.toString());
    }
}
