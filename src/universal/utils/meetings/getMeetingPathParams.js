// @flow
/*
 * Avoid this if you can! Everything should be stored under localStage and localPhase already.
 * Grabbing state from the url is non-deterministic depending on when a component updates!
 */
import {matchPath} from 'react-router-dom'
import type {MeetingTypeEnum, NewMeetingPhaseTypeEnum} from 'universal/types/schema.flow'
import findKeyByValue from 'universal/utils/findKeyByValue'
import {meetingTypeToSlug, phaseTypeToSlug} from 'universal/utils/meetings/lookups'
import {RETROSPECTIVE} from 'universal/utils/constants'

type MeetingParams = {
  meetingSlug?: ?string,
  meetingType?: ?MeetingTypeEnum | string,
  teamId?: ?string,
  phaseSlug?: ?string,
  phaseType?: ?NewMeetingPhaseTypeEnum | string,
  stageIdx?: ?number
}

const getMeetingPathParams = (): MeetingParams => {
  const matchRes = matchPath(window.location.pathname, {
    path: '/:meetingSlug/:teamId/:phaseSlug?/:stageIdxSlug?'
  })
  if (!matchRes || matchRes.params.meetingSlug === 'retrospective-demo') {
    const demoMatchRes = matchPath(window.location.pathname, {
      path: '/retrospective-demo/:phaseSlug?/:stageIdxSlug?'
    })
    if (!demoMatchRes) return {}
    const {
      params: {phaseSlug, stageIdxSlug}
    } = demoMatchRes
    return {
      meetingSlug: meetingTypeToSlug[RETROSPECTIVE],
      meetingType: RETROSPECTIVE,
      phaseSlug,
      phaseType: findKeyByValue(phaseTypeToSlug, phaseSlug),
      stageIdx: stageIdxSlug ? Number(stageIdxSlug) - 1 : undefined,
      stageIdxSlug,
      teamId: 'demo'
    }
  }
  const {
    params: {meetingSlug, teamId, phaseSlug, stageIdxSlug}
  } = matchRes
  return {
    meetingSlug,
    meetingType: findKeyByValue(meetingTypeToSlug, meetingSlug),
    phaseSlug,
    phaseType: findKeyByValue(phaseTypeToSlug, phaseSlug),
    stageIdx: stageIdxSlug ? Number(stageIdxSlug) - 1 : undefined,
    stageIdxSlug,
    teamId
  }
}

export default getMeetingPathParams
