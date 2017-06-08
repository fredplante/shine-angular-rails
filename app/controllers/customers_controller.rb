class CustomersController < ApplicationController

  PAGE_SIZE = 10

  def index
    @page = (params[:page] || 1).to_i

    if params[:keywords].present?
      @keywords = params[:keywords]
      @customers = CustomerSearchQuery.new.search(term: @keywords)
                    .offset(PAGE_SIZE * (@page - 1)).limit(PAGE_SIZE)
    else
      @customers = []
    end

    respond_to do |format|
      format.html {}
      format.json { render json: @customers }
    end
  end

  def show
    customer = Customer.find(params[:id])
    respond_to do |format|
      format.json { render json: customer }
    end
  end
end
