require 'tidy_ffi'

namespace :site do
  desc "Delete generated content"
  task :delete do
    puts "Deleting content in _site"
    system('rm -r _site')
  end

  desc "Generate content"
  namespace :build do
    desc "Generate and deploy locally"
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

  def tidy
    puts "Tidying up HTML content"
    Dir.glob('_site/**/*.html') do |path|
      content = File.open(path).read

      File.open(path, 'w') {|file|
        file.write TidyFFI::Tidy.new(content,
          :numeric_entities => 1,
          :output_html => 1,
          :merge_divs => 0,
          :merge_spans => 0,
          :join_styles => 0,
          :clean => 1,
          :indent => 1,
          :wrap => 0,
          :drop_empty_paras => 1,
          :literal_attributes => 1).clean
      }
    end
  end
end
