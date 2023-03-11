// exports reusable types


export type CurrentComp = {
    client: string,
    props: {}
}

export type IslandData = {
    [index: string]: CurrentComp
}

