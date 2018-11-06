# restart server after changing this

class String

  # separate str(most numbers) to mileage format e.g 10000 => 10 000
  def in_groups_of(n, sep = ' ')
    reverse.chars.each_slice(n).map(&:join).join(sep).reverse
  end
end