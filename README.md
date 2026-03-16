# evoluciones-pokemon
# Evoluciones Pokémon - Test de Contrato de API

## Resumen del Proyecto

Este proyecto es un conjunto de pruebas de contrato automatizadas para validar la API de Pokémon (PokeAPI). El objetivo es verificar que los endpoints de datos de Pokémon y cadenas de evolución devuelvan la estructura de datos correcta y contengan la información esperada.

**Datos obtenidos de:** PokeAPI (https://pokeapi.co/api/v2/)

**Resultado final:** Las pruebas validan esquemas de respuesta, extraen nombres de especies en la cadena de evolución y verifican pesos de Pokémon, asegurando la integridad de los datos de la API. Al final imprime la cadena de evolución en orden alfabético.

## Instalación y Configuración

### 1. Descargar el Proyecto
```bash
git clone https://github.com/williamMorales16/evoluciones-pokemon.git
cd evoluciones-pokemon
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
Copia el archivo de ejemplo y configura la URL de la API:
```bash
cp .env.example .env
```

Edita `.env` y agrega la URL real de la API:
```
POKEMON_API_URL=https://pokeapi.co/api/v2/
```

## Estructura del Proyecto

```
evoluciones-pokemon/
├── .env                    # Variables de entorno (no versionado)
├── .env.example           # Ejemplo de variables de entorno
├── package.json           # Dependencias y scripts
├── playwright.config.ts   # Configuración de Playwright
├── tsconfig.json          # Configuración de TypeScript
├── README.md              # Este archivo
├── integration-test/      # Pruebas de integración
│   ├── features/          # Características (vacío)
│   ├── flows/             # Flujos de prueba (vacío)
│   ├── schema/            # Esquemas de validación
│   │   └── getPokemonData.schema.ts
│   ├── service/           # Servicios de API
│   │   ├── getEvolutionChain.service.ts
│   │   └── getPokemonData.service.ts
│   ├── tasks/             # Tareas de negocio
│   │   └── EvolutionTasks.ts
│   └── utils/             # Utilidades
│       └── PokemonUtils.ts
├── test-results/          # Resultados de pruebas
└── tests/                 # Archivos de prueba
    └── getPokemonDataContract.spec.ts
```

## Ejecución de Pruebas

### Ejecutar Todas las Pruebas
```bash
npm test
```

### Ejecutar Prueba Específica
```bash
npx playwright test tests/getPokemonDataContract.spec.ts
```

### Ejecutar con Reporte HTML
```bash
npx playwright test --reporter=html
```

## Explicación de Clases y Métodos

### EvolutionTasks
Clase que encapsula tareas relacionadas con el procesamiento de datos de evolución de Pokémon.

- **logEvolutionChainData(evolutionChainData: any): Promise<string[]>**
  - Procesa recursivamente la cadena de evolución
  - Extrae todos los nombres de especies (`species.name`)
  - Retorna un array con los nombres encontrados
  - Registra en consola la información procesada

- **logPokemonWeight(pokemonData: any): Promise<void>**
  - Extrae y registra en consola el peso del Pokémon

### PokemonUtils
Clase de utilidades para operaciones con datos de Pokémon.

- **orderSpeciesByName(speciesList: any[]): string[]**
  - Ordena alfabéticamente una lista de nombres de especies usando el algoritmo de burbuja
  - Retorna la lista ordenada

### GetPokemonDataService
Servicio para interactuar con el endpoint de datos de Pokémon.

- **getPokemonData(pokemonName: string): Promise<APIResponse>**
  - Realiza una petición GET al endpoint `/pokemon/{pokemonName}`
  - Retorna la respuesta completa de la API

### GetEvolutionChainService
Servicio para obtener cadenas de evolución.

- **getEvolutionChain(evolutionChainId: number): Promise<APIResponse>**
  - Realiza una petición GET al endpoint `/evolution-chain/{id}`
  - Retorna la respuesta completa de la API

### Esquemas (getPokemonData.schema.ts)
Definiciones de esquemas usando Zod para validación de respuestas.

- **pokemonDataSchema**: Esquema para validar la estructura de datos de un Pokémon
- **evolutionChainSchema**: Esquema para validar la estructura de cadenas de evolución

### Prueba Principal (getPokemonDataContract.spec.ts)
Test de Playwright que valida contratos de API.

- **should return the correct data structure**: Test que:
  - Obtiene cadena de evolución para Squirtle
  - Valida esquema de respuesta
  - Extrae nombres de especies usando EvolutionTasks
  - Ordena los nombres alfabéticamente usando PokemonUtils
  - Obtiene datos del Pokémon
  - Valida esquema y registra peso