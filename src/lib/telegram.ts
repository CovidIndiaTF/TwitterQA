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
      body: { chat_id, text },
      json: true
    }

    return rp(options);
  }
}


export default new Telegram('1135855154:AAGMf76rhvYDYPRuVlDyC1WKl3qKNbUdN5o')
