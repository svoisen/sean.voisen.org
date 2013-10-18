require 'rubygems'
require 'tidy_ffi'
require 'jammit'

desc "Generate content"
namespace :content do
  desc "Delete generated content"
  task :clean do
    puts "Deleting content in _site"
    system('rm -r _site/*')
  end

  desc "Generate content for local testing"
  task :development => :clean do
    puts "Generating content for local testing"
    system('jekyll build')
    # tidy
  end

  desc "Generate production content"
  task :production => :clean do
    puts "Generating content for production"
    system('jekyll build')
    # tidy
  end
end

desc "Generate styles"
namespace :styles do
  task :clean do
    puts "Deleting generated styles"
    system('rm styles/main.css styles/screen.css')
  end

  task :compile do
    puts "Compiling Sass"
    system('compass compile --sass-dir styles --css-dir styles')
  end

  task :concatenate do
    puts "Concatenating CSS"
    Jammit.package!({:config_path => '_assets.yml', :output_folder => 'styles'})
  end

  task :build => [:clean, :compile, :concatenate]
end

desc "Complete build"
namespace :build do
  task :development => [:"styles:build", :"content:development"]
  task :production => [:"styles:build", :"content:production"]
end

desc "Start development server"
task :server do
  system('jekyll serve --drafts --watch')
end

desc "Builds and deploys to remote production server"
task :deploy => [:"build:production"] do
  system('rsync -avrz --delete -e "ssh -i /Users/svoisen/.ssh/id_rsa" _site/ svoisen@voisen.org:sean.voisen.org')
  puts "Production site deployed!"
end

def tidy
  puts "Tidying up HTML content"
  Dir.glob('_site/**/*.html') do |path|
    content = File.open(path).read

    File.open(path, 'w') {|file|
      file.write TidyFFI::Tidy.new(content,
        :numeric_entities => 1,
        :output_xhtml => 0,
        :merge_divs => 0,
        :merge_spans => 0,
        :join_styles => 0,
        :clean => 1,
        :indent => 1,
        :wrap => 0,
        :drop_empty_paras => 1,
        :literal_attributes => 1,
        :char_encoding => 'utf8').clean
    }
  end
end

task :default => :"build:development"
