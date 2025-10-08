import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { translations, Language, TranslationKey } from '@/utils/translations';

interface LanguageState {
  currentLanguage: Language;
}

const initialState: LanguageState = {
  currentLanguage: 'fa'
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload;
    }
  }
});

export const { setLanguage } = languageSlice.actions;

export const selectCurrentLanguage = (state: { language: LanguageState }) => state.language.currentLanguage;

export const selectTranslation = (state: { language: LanguageState }) => {
  return (key: TranslationKey): string => {
    return translations[state.language.currentLanguage][key];
  };
};

export default languageSlice.reducer;
