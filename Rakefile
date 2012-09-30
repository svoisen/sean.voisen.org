require 'rubygems'
require 'tidy_ffi'

namespace :site do
  desc "Delete generated content"
  task :delete do
    puts "Deleting content in _site"
    system('rm -r _site')
    system('mkdir _site')
  end

  desc "Generate content"
  namespace :build do
    desc "Generate content for local testing"
    task :dev => :delete do
      puts "Generating content for local testing"
      system('jekyll')
      tidy
    end

    desc "Generate production content"
    task :pro => :delete do
      puts "Generating content for production"
      system('jekyll --lsi')
      tidy
    end
  end

  desc "Synchronize with servers"
  namespace :rsync do
    desc "Synchronize site to remote production server"
    task :pro => :"build:pro" do
      puts "Synchronizing with remote production server"
      system('rsync -avrz --delete -e "ssh -i /Users/svoisen/.ssh/id_rsa" _site/ svoisen@voisen.org:sean.voisen.org')
    end
  end

  desc "Deploy"
  namespace :deploy do
    desc "Builds and deploys locally"
    task :dev => [:"build:dev", :"rsync:dev"] do
      puts "Local site deployed!"
    end

    desc "Builds and deploys to remote production server"
    task :pro => [:"build:pro", :"rsync:pro"] do
      puts "Production site deployed!"
    end
  end

  def tidy
    puts "Tidying up HTML content"
    Dir.glob('_site/**/*.html') do |path|
      content = File.open(path).read

      File.open(path, 'w') {|file|
        file.write TidyFFI::Tidy.new(content,
          :numeric_entities => 1,
          :output_xhtml => 1,
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
end
