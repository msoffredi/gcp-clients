export interface ObjectType {
    [key: string]:
        | string
        | number
        | ObjectType
        | boolean
        | ObjectType[]
        | string[]
        | number[]
        | undefined
        | null;
}
