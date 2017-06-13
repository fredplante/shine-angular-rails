class CustomerSearchQuery
  attr_reader :relation, :where_clause, :where_args, :order, :term

  def initialize(relation: Customer.all)
    @relation = relation
  end

  def search(search_term:)
    @term = search_term.downcase
    @where_clause = ""
    @where_args = {}
    if @term =~ /@/
      build_for_email_search
    else
      build_for_name_search
    end
    relation.where(where_clause, where_args).order(order)
  end

  private

  def build_for_name_search
    where_clause << case_insensitive_search(:first_name)
    where_args[:first_name] = starts_with(term)
    where_clause << " OR #{case_insensitive_search(:last_name)}"
    where_args[:last_name] = starts_with(term)
    @order = "last_name asc"
  end

  def starts_with(search_term)
    search_term + "%"
  end

  def case_insensitive_search(field_name)
    "lower(#{field_name}) like :#{field_name}"
  end

  def extract_name(email)
    email.gsub(/@.*$/,'').gsub(/[0-9]+/,'')
  end

  def build_for_email_search
    where_clause << case_insensitive_search(:first_name)
    where_args[:first_name] = starts_with(extract_name(term))
    where_clause << " OR #{case_insensitive_search(:last_name)}"
    where_args[:last_name] = starts_with(extract_name(term))
    where_clause << " OR #{case_insensitive_search(:email)}"
    where_args[:email] = term
    @order = "lower(email) = " +
      ActiveRecord::Base.connection.quote(term) +
      " desc, last_name asc"
  end
end
