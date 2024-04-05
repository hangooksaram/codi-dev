import * as ChannelService from '@channel.io/channel-web-sdk-loader';

ChannelService.loadScript();
ChannelService.boot({
    "pluginKey": "4f7d8465-e681-44e8-859f-103a25233287", // fill your plugin key
    customLauncherSelector:'#channelTalk',
    hideChannelButtonOnBoot:true
  });


