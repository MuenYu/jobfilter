export default abstract class Operator {
  abstract getJDCountOnCurPage(): Promise<number>;
  abstract nextPage(): Promise<boolean>;
  abstract clickJD(id: number): Promise<Boolean>;
  abstract fetchJDInfo(): Promise<JDInfo|null>;
  
  async scrollTo(scrollable: HTMLElement, step: number, interval: number) {
    const scrollHeight = scrollable.scrollHeight;
    for (let i = 0; i < scrollHeight; i += step) {
      scrollable.scrollTop = i;
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}
