// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START functions_firebase_analytics]
/**
 * Background Function triggered by a Google Analytics for Firebase log event.
 *
 * @param {!Object} event The Cloud Functions event.
 */
exports.helloAnalytics = event => {
  const {resource} = event;
  console.log(`Function triggered by the following event: ${resource}`);

  const [analyticsEvent] = event.data.eventDim;
  console.log(`Name: ${analyticsEvent.name}`);
  console.log(`Timestamp: ${new Date(analyticsEvent.timestampMicros / 1000)}`);

  const userObj = event.data.userDim;
  console.log(`Device Model: ${userObj.deviceInfo.deviceModel}`);
  console.log(`Location: ${userObj.geoInfo.city}, ${userObj.geoInfo.country}`);
};
// [END functions_firebase_analytics]
