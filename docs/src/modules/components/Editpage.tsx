import Button from '@material-ui/core/Button';
import { useHoux } from 'houx';
import React from 'react';

import { useTranslation } from '../../../../i18n';
import { RootState } from '../redux/reducers';

const LOCALES = { zh: 'zh-CN', pt: 'pt-BR', es: 'es-ES' };
const CROWDIN_ROOT_URL = 'https://crowdin.com/project/project-millipede';
const SOURCE_CODE_ROOT_URL =
  'https://github.com/project-millipede/millipede-docs/edit/master';

export interface EditPageProps {
  markdownLocation: string;
  sourceCodeRootUrl: string;
}

export const EditPage = ({ markdownLocation }: EditPageProps) => {
  const { state }: { state: RootState } = useHoux();
  const { userLanguage } = state.language;

  const { t } = useTranslation();

  const crowdInLocale = LOCALES[userLanguage] || userLanguage;
  const crowdInPath = markdownLocation.substring(
    0,
    markdownLocation.lastIndexOf('/')
  );

  return (
    <Button
      component='a'
      href={
        userLanguage === 'de'
          ? `${SOURCE_CODE_ROOT_URL}${markdownLocation}`
          : `${CROWDIN_ROOT_URL}${crowdInLocale}#/staging${crowdInPath}`
      }
      target='_blank'
      rel='noopener'
      data-ga-event-category={userLanguage === 'de' ? undefined : 'l10n'}
      data-ga-event-action={userLanguage === 'de' ? undefined : 'edit-button'}
      data-ga-event-label={userLanguage === 'de' ? undefined : userLanguage}
    >
      {t('editContent')}
    </Button>
  );
};

export default EditPage;
