import * as rp from 'request-promise'


class Telegram {
  private _baseUrl

  constructor (accessToken) {
    this._baseUrl = `https://api.telegram.org/bot${accessToken}`
  }

  async sendMessage(chat_id: string, text: string): Promise<any> {
    const options = {
      method: 'POST',
      uri: `${this._baseUrl}/sendMessage`,
      body: { chat_id, text, disable_web_page_preview: true },
      json: true
    }

    return rp(options);
  }
}


export default new Telegram('1280955627:AAF9sU_ZutvHoQ01NOD-SJhGRpE5fTR5BGY')
