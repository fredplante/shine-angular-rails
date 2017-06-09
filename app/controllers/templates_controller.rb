class TemplatesController < ApplicationController
  def show
    render template: "templates/#{params[:path]}", layout: false
  end
end
