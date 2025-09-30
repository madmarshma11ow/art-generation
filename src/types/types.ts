export type Art = {
    id: number
    image: string
    parameters: Parameters
    improve_count: number
}

export type Parameters = {
    attack?: number
    health?: number
    protect?: number
    critDamage?: number
    critChance?: number
}
