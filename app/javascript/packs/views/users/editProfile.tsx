import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import {
  Box,
  Heading,
  Button,
  Form,
  FormField,
  TextInput,
  Select
} from "grommet";
import {
  privateRootPath,
} from "../../routesPath";

import CurrentUser from "../../components/customHooks/currentUser";

import ServerError from "../../components/serverError";

export default function EditProfile() : ReactElement {
  CurrentUser({
    onCompletedCallback: ({currentUser: { nickname, name } }) =>{
      setValues({...values, nickname, name})
    }
  });
  const { t } = useTranslation();
  const history = useHistory();
  const [values, setValues] = React.useState(
    {
      language: "",
      name: "",
      nickname: ""
    },
  );
  //console.log(values)
  return (
    <Box>
      <Heading level={3}>{t("edit-profile.title")}</Heading>
      {/*networkError !== "" && <ServerError messages={networkError} />*/}
      <Form
        value={values}
        onChange={(nextValues) => setValues(nextValues)}
        onSubmit={({ value }) => {}}
      >
        <FormField name="name" htmlFor="name" label={t("edit-profile.name")} required>
          <TextInput id="name" name="name" />
        </FormField>
        <FormField name="nickname" htmlFor="nickname" label={t("edit-profile.nickname")} required>
          <TextInput id="nickname" name="nickname" />
        </FormField>
        <FormField name="language" htmlFor="language" label={t("edit-profile.language")} >
        <Select
          id="language"
          name="language"
          options={["fr", "en"]}
          children={
            (option, index, options, { active, disabled, selected }) => {
              return <option value={option}>{t(`edit-profile.${option}`)}</option>
            }
          }
        />
        </FormField>
        <Box direction="row" justify="end" gap="medium">
          <Button primary label={t("edit-profile.back")} onClick={()=> history.push(privateRootPath)} />
          <Button type="submit" primary label={t("sign-up.submit")} />
        </Box>
      </Form>
    </Box>
  );
}
