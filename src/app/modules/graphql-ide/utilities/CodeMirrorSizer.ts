import CodeMirror from 'codemirror';

export interface SizerComponent {
  getClientHeight: () => number | null;
  getCodeMirror: () => CodeMirror.Editor;
}

export class CodeMirrorSizer {
  public sizes: Array<number | null> = [];

  public updateSizes(components: Array<SizerComponent>) {
    components.forEach((component, i) => {
      if (component) {
        const size = component.getClientHeight();
        if (i <= this.sizes.length && size !== this.sizes[i]) {
          const editor = component.getCodeMirror();
          if (editor) {
            editor.setSize(null, null);
          }
        }
        this.sizes[i] = size;
      }
    });
  }
}
