// import { getEntities, getResults } from 'reducers';
// import { Map, List } from 'immutable';
// import { denormalize } from 'normalizr';
// import {
//   dealComment,
//   user,
//   userInfo,
//   offer,
//   ticker,
//   notification,
//   term,
//   userMessage,
//   fiatCurrency,
//   exchange,
//   story,
//   news,
//   wallet,
//   accountPaymentSystem,
//   bankCard,
//   deal,
//   course,
//   marketSubscription,
//   logItem,
//   authHistory,
//   transaction,
//   FAQTopic,
//   article,
//   cryptoStat,
//   topic,
//   topicMessage,
//   votes,
//   board,
//   message,
//   session,
//   exchangeAccount,
//   exchangeAccountBalance,
//   exchangeAccountTradeInfo,
//   statsTicker,
//   exchangeAccountConversionInfo,
//   blockedUser,
//   importedAccount,
// } from 'schemas';
//
import useISESelector from './useISESelector';

export {
  useISESelector,
};
//
export const defaultArray = [];
export const defaultObject = {};
export const defaultOString = '';
export const defaultNumber = 0;
//
// const getDenormalizedEntity = (schema, isList = false) => (state, resultKey) =>
//   denormalize(
//     getResults(state).get(
//       resultKey,
//       isList ? defaultList : defaultMap,
//     ) || (isList ? defaultList : defaultMap),
//     schema,
//     getEntities(state),
//   );
//
// const getSimpleResult = initialValue => (state, resultKey) =>
//   getResults(state).get(resultKey, initialValue);
//
export const getArray = (state, key) => state.entities[key] || defaultArray;
export const getObject = (state, key) => state.entities[key] || defaultObject;
export const getString = (state, key) => state.entities[key] || defaultOString;
export const getNumber = (state, key) => state.entities[key] || defaultNumber;
// export const mapSelector = getSimpleResult(defaultMap);
// export const listSelector = getSimpleResult(defaultList);
// export const primitiveSelector = (state, resultKey, initialValue) =>
//   getResults(state).get(resultKey, initialValue);
// export const entitiesSelector = (state, resultKey) =>
//   getEntities(state).get(resultKey, Map());
//
// export const topicMessageSelector = getDenormalizedEntity(topicMessage.schema);
// export const topicMessagesSelector = getDenormalizedEntity(topicMessage.schemasArray, true);
