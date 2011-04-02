# coding: utf-8
require 'rubygems'
require 'indextank'
require 'yaml'

CONFIG = YAML.load_file 'config.yml'

api_client = IndexTank::Client.new CONFIG['api_url']
idx = api_client.indexes CONFIG['index']

puts "Indexing..."
f = File.open("instrument.tsv")
f.readline #discard header
docs = Array.new
f.each_line do |l|
  name,id,family,variation,instrumentalists  = l.split /\t/
  docs << {:docid => id, :fields => {:text => l, :name => name, :family => family, :variation => variation}}
end
printf "Indexed %d documents.\n", idx.batch_insert(docs).size
