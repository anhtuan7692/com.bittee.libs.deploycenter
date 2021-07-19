// DcLibs.m

#import "DcLibs.h"


@implementation DcLibs

RCT_EXPORT_MODULE()

//RCT_EXPORT_METHOD(sampleMethod:(NSString *)stringArgument numberParameter:(nonnull NSNumber *)numberArgument callback:(RCTResponseSenderBlock)callback)
//{
//    // TODO: Implement some actually useful functionality
//    callback(@[[NSString stringWithFormat: @"numberArgument: %@ stringArgument: %@", numberArgument, stringArgument]]);
//}

RCT_EXPORT_METHOD(getAppInfo: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString * bundleId = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleIdentifier"];
    NSString * buildNumber = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleVersion"];
    NSString * appVersion = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];
    //    String data = String.format("%s:%s:%s", packageName, version, versionCode);
    resolve([NSString stringWithFormat: @"%@:%@:%@", bundleId,appVersion,buildNumber]);
}

//RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)title
//                 location:(NSString *)location
//                 resolver:(RCTPromiseResolveBlock)resolve
//                 rejecter:(RCTPromiseRejectBlock)reject)
//{
//    NSInteger eventId = 1;//createCalendarEvent();
// if (eventId) {
//    resolve(@[@(eventId)]);
//  } else {
//    reject(@"event_failure", @"no event id returned", nil);
//  }
//}

@end
