require 'sinatra'
require 'indextank'
require 'haml'
require 'yaml'
require 'json'

CONFIG = YAML.load_file 'config.yml'

get '/' do
  haml :index
end

get '/search' do
  api_client = IndexTank::Client.new CONFIG['api_url']
  idx = api_client.indexes CONFIG['index']
  @query = params[:query]
  if @query and @query != ''
    @results = idx.search(@query, :fetch => 'name,family,variation', :snippet => 'text')
    puts @results
  end
  if params[:fmt] == 'json'
     @results.to_json
  else
    haml :index
  end
end
