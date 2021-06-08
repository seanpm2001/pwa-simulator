import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import './device-preview.js';
import { Manifest, Platform } from './models';

@customElement('manifest-previewer')
export class ManifestPreviewer extends LitElement {
  static styles = css`
    .container {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .card {
      background: #FFF;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 6px;
      height: 792px;
      position: relative;
      display: none;
      font-family: Hind;
      font-style: normal;
      z-index: 0;
    }

    .title {
      position: absolute;
      left: calc(50% - 33px);
      top: 23px;
      margin: 0;
      width: 66px;
      font-weight: 700;
      font-size: 18px;
      line-height: 24px;
      color: #292C3A;
      text-decoration: underline solid #292C3A;
      text-underline-position: under;
      text-decoration-thickness: 2px;
    }

    .buttons-div {
      display: flex;
      justify-content: space-between;
      position: absolute;
      top: 71px;
      left: calc(50% - 88.5px);
      width: 177px;
    }

    button {
      height: 35px;
      border-radius: 33.2847px;
      border: none;
      font-family: Hind;
      font-style: normal;
      font-weight: 700;
      font-size: 12.5751px;
      line-height: 19px;
      width: 80.5px;
      background: #FFF;
      box-shadow: 0px 3px 3.02588px rgba(0, 0, 0, 0.25);
      color: #292C3A;
    }

    button.selected {
      background: #292C3A;
      box-shadow: 0px 0.75647px 3.02588px rgba(0, 0, 0, 0.25);
      color: #FFF;
    }

    .name {
      background: rgba(194, 194, 194, 0.4);
      border-radius: 4px;
      height: 24px;
      font-weight: 700;
      font-size: 16px;
      line-height: 25px;
      text-align: center;
      color: #000;
      margin: 134.54px auto 0;
      width: fit-content;
      padding: 0 5px;
    }

    .name-text {
      position: absolute;
      top: 171px;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      color: #808080;
    }

    .preview-text {
      position: absolute;
      bottom: 25px;
      left: calc(50% - 52px);
      font-weight: 400;
      font-size: 10px;
      line-height: 16px;
      text-align: center;
      color: #808080;
      width: 104px;
    }

    img.nav-arrow {
      position: absolute;
      width: 19px;
      height: 38px;
      top: 377px;
      right: 16px;
    }

    @media(min-width: 800px) {
      .card {
        display: block;
      }
    }

    /* 800 designs */
    @media(min-width: 800px) and (max-width: 1024px) {
      .card {
        width: 354px;
      }

      .name-text {
        width: 273px;
        left: calc(50% - 136.5px);
      }
    }

    /* 1024 designs */
    @media(min-width: 1024px) and (max-width: 1366px) {
      .card {
        width: 366px;
      }

      .name-text {
        width: 282px;
        left: calc(50% - 141px);
      }
    }

    /* 1366 designs */
    @media(min-width: 1366px) {
      .card {
        width: 479.03px;
      }

      .name-text {
        width: 282px;
        left: calc(50% - 141px);
      }

      img.nav-arrow {
        right: 50px;
      }
    }
  `;

  /**
   * The input web manifest.
   */
  @property({ 
    type: Object,
    converter: value => {
      if (!value) {
        return undefined;
      }
      return JSON.parse(value);
    }
  })
  manifest: Manifest = {
    name: 'My app',
    icons: []
  }

  /**
   * The url where the manifest resides.
   */
  @property({ type: String })
  manifestUrl = "";

  /**
   * The platform currently being previewed.
   */
  @state()
  selectedPlatform = Platform.Windows;

  /**
   * Based on the buttom clicked, change the platform to preview.
   * 
   * @param platform - Platform corresponding to the selected button
   */
   private handlePlatformButtonClick(platform: Platform) {
    this.selectedPlatform = platform;
  }

  render() {
    return html`
      <div class="container">
        <div class="card">
          <img src="../assets/images/nav_arrow.png" alt="Navigate right" class="nav-arrow" />
          <h4 class="title">Preview</h4>
          <div class="buttons-div">
            <button 
            class=${classMap({ selected: this.selectedPlatform === Platform.Windows })} 
            @click=${() => this.handlePlatformButtonClick(Platform.Windows)}>
              Windows
            </button>
            <button 
            class=${classMap({ selected: this.selectedPlatform === Platform.Android })} 
            @click=${() => this.handlePlatformButtonClick(Platform.Android)}>
              Android
            </button>
          </div>
          <div class="name">${this.manifest.name}</div>
          <p class="name-text">Should the description be here?</p>
          <!-- <div 
          class=${classMap({ 
            'windows-preview': this.selectedPlatform === Platform.Windows, 
            'android-preview': this.selectedPlatform === Platform.Android
            })
          }
          style=${styleMap({
            backgroundColor: this.manifest.background_color || '#FFF'
          })}>
          </div> -->
          <device-preview
          .manifest=${this.manifest} 
          .manifestUrl=${this.manifestUrl}
          .selectedPlatform=${this.selectedPlatform}>
          </device-preview>
          <p class="preview-text">Click to enlarge Preview</p>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'manifest-previewer': ManifestPreviewer;
  }
}
