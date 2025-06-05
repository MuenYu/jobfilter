export default abstract class Operator {
  abstract getJDCountOnCurPage(): number;
  abstract nextPage(): boolean;
  abstract clickJD(id: number): void;
  abstract fetchJDInfo(): JDInfo;
  goToFooter(){}
}
