import {FormJSON} from '../../form-wrapper/models/form.data';

export const USER_FORM_JSON: FormJSON = {
  rows: [
    {
      columns: [
        {
          name: 'firstName',
          type: 'text',
          label: 'First Name',
          value: '',
          validators: [
            'required'
          ]
        },
        {
          name: 'lastName',
          type: 'text',
          label: 'Last Name',
          value: '',
          validators: [
            'required'
          ]
        }
      ]
    },
    {
      columns: [
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          value: '',
          validators: [
            'required',
            'email'
          ]
        },
        {
          name: 'role',
          type: 'select',
          label: 'Role',
          value: '',
          options: [],
          validators: [
            'required',
          ]
        }
      ]
    }
  ]
};
