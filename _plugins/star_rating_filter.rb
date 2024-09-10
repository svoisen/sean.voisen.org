module StarRatingFilter

  def star_rating(rating)
	whole_stars = rating.floor
	whole_stars += 1 if (rating - whole_stars > 0.5)
	half_star = (rating - whole_stars == 0.5 ? 1 : 0)

	rating_text = "%.1f/5.0" % [rating]
	if rating == 1
		rating_text += " star"
	else
		rating_text += " stars"
	end

	rating_stars = String::new
	whole_stars.times do
	  rating_stars += "⭑"
	end

	if (half_star == 1)
	  rating_stars += "½"
	end

	output = '<span class="visual-hidden">%{rating_text}</span><span class="stars" aria-hidden="true">%{rating_stars}</span>'
	output = output % {rating_text: rating_text, rating_stars: rating_stars}

	return output
  end

  Liquid::Template.register_filter(StarRatingFilter)
end
