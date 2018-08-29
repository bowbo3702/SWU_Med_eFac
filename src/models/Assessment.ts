export class Assessment {
    constructor(public lstLabels: string[], public lstDataSet: GraphInfoData[])
     { }
}
export class GraphInfoData {
    constructor(
        public lstData: number[], public label
    ){}
}