import development from './development.json'

class Config {
  private readonly apiUrl: string

  constructor () {
    const config = development

    this.apiUrl = config.apiUrl
  }

  getApiUrl (): string {
    return this.apiUrl
  }
}

export default new Config()
