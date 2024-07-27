[:documents, :pages].each do |hook|
   Jekyll::Hooks.register hook, :post_render do |item|
      if item.output_ext == ".html"
         content  = item.output
         site_url = item.site.config["url"]

         content.gsub!(%r{<a\s+href="((?!#{Regexp.escape(site_url)})https?://.*?)"}, "<a href=\"\\1\" target=\"_blank\"")
         content.gsub!(%r{\.zip" target="_blank"}, ".zip\"")
         content.gsub!(%r{\.zip"}, ".zip\" download")

         # Update the item content
         item.output = content
      end
   end
 end
