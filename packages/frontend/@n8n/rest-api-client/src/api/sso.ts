import type { SamlPreferences, SamlToggleDto } from '@n8n/api-types';

import type { IRestApiContext } from '../types';
import { makeRestApiRequest } from '../utils';

export type SamlPreferencesExtractedData = {
	entityID: string;
	returnUrl: string;
};

export const initSSO = async (context: IRestApiContext, redirectUrl = ''): Promise<string> => {
	return await makeRestApiRequest(context, 'GET', `/sso/saml/initsso?redirect=${redirectUrl}`);
};

export const getSamlMetadata = async (context: IRestApiContext): Promise<SamlPreferences> => {
	return await makeRestApiRequest(context, 'GET', '/sso/saml/metadata');
};

export const getSamlConfig = async (
	context: IRestApiContext,
): Promise<SamlPreferences & SamlPreferencesExtractedData> => {
	return await makeRestApiRequest(context, 'GET', '/sso/saml/config');
};

export const saveSamlConfig = async (
	context: IRestApiContext,
	data: Partial<SamlPreferences>,
): Promise<SamlPreferences | undefined> => {
	return await makeRestApiRequest(context, 'POST', '/sso/saml/config', data);
};

export const toggleSamlConfig = async (
	context: IRestApiContext,
	data: SamlToggleDto,
): Promise<void> => {
	return await makeRestApiRequest(context, 'POST', '/sso/saml/config/toggle', data);
};

export const testSamlConfig = async (context: IRestApiContext): Promise<string> => {
	return await makeRestApiRequest(context, 'GET', '/sso/saml/config/test');
};
