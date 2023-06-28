export default class SpeakDetail {
  private page: Document;
  constructor(document: Document) {
    this.page = document;
  }
  /**
   * 获取话术表
   * @param {Page} page 当前页面
   */
  private _getSpeakTable(): HTMLTableSectionElement {
    const table = this.page.getElementsByTagName("tbody");

    if (table.length === 1) {
      return table.item(0);
    } else if (table.length == 2) {
      return table[table.length - 1];
    } else {
      for (let i = 0; i < table.length; i++) {
        if (table.item(i).childNodes.length == 1) {
          continue;
        } else {
          return table.item(i);
        }
      }
      alert("获取表格失败");
      throw new Error("获取表格失败");
    }
  }
  getTitle(): string {
    const titleElement = this.page.getElementsByClassName("info-title");
    if (titleElement.length) {
      return titleElement.item(0).textContent;
    }
  }
  /**
   * 获取行数组
   * @param {Table} table 当前表格
   */
  private _getSpeakRows(): HTMLCollectionOf<HTMLTableRowElement> {
    const table = this._getSpeakTable();
    if (table) {
      return table.rows;
    } else {
      return null;
    }
  }

  /**
   * 获取单元格
   * @param {Table} table 当前表格
   *
   */
  private _getSpeakCells(
    row: HTMLTableRowElement
  ): HTMLCollectionOf<HTMLTableCellElement> {
    return row.cells;
  }
  /**
   * 获取列数组
   * @param {Table} table 当前表格
   */
  private _getSpeakColumes(table: HTMLElement): HTMLElement[] {
    return [];
  }
  formatTable(): void {
    let rows = this._getSpeakRows();
    for (let i = 0; i < rows.length; i++) {
      const cells = this._getSpeakCells(rows[i]);
      const speakContentCell = cells.item(cells.length - 1);
      const spreadIdentifyParent = speakContentCell.getElementsByClassName(
        "justify-content-end"
      );
      if (spreadIdentifyParent.length) {
        const spreadIdentify = spreadIdentifyParent
          .item(0)
          .getElementsByTagName("span");
        if (
          spreadIdentify.length === 1 &&
          spreadIdentify.item(0).innerText === "收起"
        ) {
          spreadIdentify.item(0).click();
        }
      }
    }
  }
  private _getSpeakContent(rows: HTMLCollectionOf<HTMLTableRowElement>) {
    let text = "";
    for (let i = 0; i < rows.length; i++) {
      const cells = this._getSpeakCells(rows[i]);
      const contentCell = cells.item(cells.length - 1);
      console.log(contentCell.innerText);
      if (contentCell.innerText.endsWith("展开")) {
        text += contentCell.innerText.slice(0, -2);
      } else {
        text += contentCell.innerText;
      }
    }
    return text;
  }
  private _formatSpeakContent(text: string) {
    const result = text.replace(/主播\d*:|助播\d*:|主播\d*：|助播\d*：/g, "");
    console.log(result);
    return result;
  }
  exportText() {
    let rows = this._getSpeakRows();
    const content = this._getSpeakContent(rows);
    return this._formatSpeakContent(content);
  }
}
