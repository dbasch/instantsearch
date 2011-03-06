require 'sinatra'
require 'indextank'
require 'haml'
require 'yaml'
require 'json'

CONFIG = YAML.load_file 'config.yml'

get '/' do
  @idx = CONFIG['index']
  @public_url = 'http://' + CONFIG['api_url'].split('@')[1]
  haml :index
end

get '/search' do
  api_client = IndexTank::Client.new CONFIG['api_url']
  idx = api_client.indexes CONFIG['index']
  @query = params[:query]
  if @query and @query != ''
    @results = idx.search(@query, :fetch => 'name,family,variation', :snippet => 'text')
    @results.to_json
  end
end
