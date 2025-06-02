import AI from "./ai";

export default class Ollama extends AI {
    async analyzeJD(jd: JDInfo): Promise<JDAnalysis> {
        throw new Error("Method not implemented.");
    }

}