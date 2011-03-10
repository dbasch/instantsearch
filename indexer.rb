require 'indextank'
require 'yaml'

CONFIG = YAML.load_file 'config.yml'

api_client = IndexTank::Client.new CONFIG['api_url']
idx = api_client.indexes CONFIG['index']

f = File.open("instrument.tsv")
f.readline #discard header
count = 0
f.each_line do |l|
  name,id,family,variation,instrumentalists  = l.split /\t/ 
  idx.document(id).add({:text => l, :name => name, :family => family, :variation => variation})
  count += 1
  if count % 50 == 0
    printf "Added %s documents\n", count
  end
end
