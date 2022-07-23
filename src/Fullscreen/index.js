/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable space-in-parens*/
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ImageFullBig from './icons/fullscreen-big.svg';
import ImageFullCancel from './icons/fullscreen-cancel.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import './css/style.css';

export default class FullScreen extends Plugin {
  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add('fullScreen', locale => {
      const view = new ButtonView(locale);
      let etat = 0; //
      view.set({
        label: '全屏',
        icon: ImageFullBig,
        tooltip: true
      });
      view.on('execute', () => {
        if (etat == 1) {
          if (editor.sourceElement.nextElementSibling === null) {
            document.querySelector('.document-editor').removeAttribute('id');
          } else {
            editor.sourceElement.nextElementSibling.removeAttribute('id');
          }

          document.body.removeAttribute('id');
          view.set({
            label: '全屏',
            icon: ImageFullBig,
            tooltip: true
          });
          etat = 0;
        } else {
          if (editor.sourceElement.nextElementSibling === null) {
            document.querySelector('.document-editor').setAttribute('id', 'fullscreeneditor');
          } else {
            editor.sourceElement.nextElementSibling.setAttribute('id', 'fullscreeneditor');
          }

          document.body.setAttribute('id', 'fullscreenoverlay');
          view.set({
            label: '默认',
            icon: ImageFullCancel,
            tooltip: true
          });
          etat = 1;
        }
      });

      return view;
    });
  }
}
