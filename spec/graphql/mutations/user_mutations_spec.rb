require 'rails_helper'

RSpec.describe Mutations::UserMutations, type: :graphql do
  include_context 'with graphql query request'

  let!(:current_user) { create(:user) }
  let(:variables) { {input: params } }
  subject{ execute_graphql }
  
  describe "createUser resolver" do
    let(:query) do
      <<~GQL
        mutation($input: UserInput!) {
          createUser(input: { user: $input }) {
            id
          }
        }
      GQL
    end


    context "when inputs are valid" do
      let(:params) do
        { email: "test@test.net", password: 'password', nickname: "jojo", name: "john dump" }
      end
      it { expect{subject}.to change { User.count }.by(1) }
    end

    context "when input are invalid" do
      let(:params) do
        { email: 'test@test.net', password: 'whatever' }
      end
      it { expect{subject}.not_to change { User.count } }
    end
  end

  describe "resolve editUser" do
    let(:query) do
      <<~GQL
        mutation($input: UserEditType!) {
          editUser(input: { user: $input }) {
            id
          }
        }
      GQL
    end
    
    context "when current_user change nickname, and tags" do
      let(:params) do
        { id: current_user.id, nickname:"Another nickname" }
      end
      it { expect{subject}.to change { current_user.reload.nickname } }
    end

    context "when try to change a non existing user" do
      let(:params) { { id: -1 } }
      it { expect{subject}.to raise_error(ActiveRecord::RecordNotFound) }
    end

    context "when try to change another user and current_user is NOT super admin" do
      let(:current_user) { create(:user)}
      let(:another_user) { create(:user)}
      let(:params) do
        { id: another_user.id, nickname: "My first try" }
      end
      it { expect{subject}.not_to change { another_user.reload.nickname } }
    end

    context "when try to change another user and current_user is super admin" do
      let(:current_user) { create(:user, :super_admin)}
      let(:another_user) { create(:user)}
      let(:params) do
        { id: another_user.id, nickname: "My first try" }
      end
      it { expect{subject}.to change { another_user.reload.nickname } }
    end
  end


end