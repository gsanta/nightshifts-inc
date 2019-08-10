import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Radio } from '@material-ui/core';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSelector = (props: LanguageSelector) => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (event: React.ChangeEvent<any>) => {
        props.changeLanguage(event.target.value);
        i18n.changeLanguage(event.target.value);
    };

    return (
        <RadioGroup
            aria-label="Gender"
            value={props.language}
            onChange={changeLanguage}
        >
            <FormControlLabel value="en" control={<Radio />} label={t('settings.english')} />
            <FormControlLabel value="hu" control={<Radio />} label={t('settings.hungarian')} />
        </RadioGroup>
    );
};

export interface LanguageSelector {
    changeLanguage(language: string);
    language: 'en' | 'hu';
}

