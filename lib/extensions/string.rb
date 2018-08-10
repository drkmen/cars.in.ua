class String
  def in_groups_of(n, sep=' ')
    chars.each_slice(n).map(&:join).join(sep)
  end
end