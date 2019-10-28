<template>
	<div>
		<!-- player layout -->
		<div class="my-nav-footer-wrap">
			<div class="my-nav-footer">
				<div class="current-music-info" @click="goMusicDetail">
					<div class="current-music-image-wrap">
						<img :src="curMusicImg" alt="" v-if="curMusicImg">
					</div>
					<div class="current-music-info-title">{{ curMusicName }}</div>
				</div>
				<div class="play-controller">
					<van-icon
							:name="playStatusFlag ? 'pause' : 'play'"
							size="2.1rem"
							@click="playOrPause(playStatusFlag)"
					></van-icon>
					<div class="space"></div>
					<van-icon
									name="bars"
									size="2.1rem"
									@click="showMaskFlag = true"
					></van-icon>
				</div>

			</div>
		</div>
		<!-- 歌曲清单 -->
		<transition name="slide-up">	
			<div class="my-songs-list-fixed" v-if="showMaskFlag">
				<div class="my-songs-list-wrap">
					<div class="songs-list-header">
						<span>歌曲数量({{ playlist.length }})</span>
						<span><van-icon name="delete" /></span>
					</div>	
					<div class="overflow-wrap">
						<ul class="songs-list">
							<li class="songs-list-item" v-for="(item, index) in playlist" :key="index" @click="goSwitchSongs(item.id)">
								<div class="song-info" :class="{'active': item.id === curMusic}">
									<span class="play-icon"><van-icon name="volume-o" /></span>
									<span class="song-name">{{ item.name }}</span>
									<span>-</span>
									<span class="singer">{{ item.artists ? item.artists[0].name : item.ar[0].name }}</span>
								</div>
								<span><van-icon name="cross" /></span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</transition>
		<!-- 遮盖层 -->
		<div class="mask" :class="{'mask-show': showMaskFlag}" @click="showMaskFlag = false"></div>
	</div>
</template>

<script>
import getData from '../api/getData'

import { mapState, mapGetters } from 'vuex'

	export default {
		name: "NavFooter",
		data(){
			return{
				showMaskFlag: false,
			}
		},
		computed: {
			...mapState({
				navFooterShowFlag: state => state.player.navFooterShowFlag,
				curMusic: state => state.player.curMusic,
				curMusicName: state => state.music.musicDetails.songs[0].name,
				curMusicUrl: state => state.music.musicUrl,
				curMusicImg: state => state.music.musicDetails.songs[0].al
															? state.music.musicDetails.songs[0].al.picUrl
															: '',
				playStatusFlag: state => state.player.playStatusFlag,
			}),
			...mapGetters({
					playlist: 'playlistFilteDuplicate',
			})
		},

		methods: {
			playOrPause(flag){
				let newFlag = !flag
				this.$store.commit('setPlayStatusFlag', newFlag)
			},

			// 旧方法，弃用
			// changeSong(newId){
			// 	this.$store.commit('setCurMusic', newId)
			// 	this.$store.dispatch('getCurMusicTotalInfos', this.$store.state.player.curMusic)
			// },

			goSwitchSongs(musicId){
				this.$store.dispatch('switchSongs', musicId)
			},

			goMusicDetail(){
				this.$router.push({
					name: 'musicDetail'
				})
			}
		},

	}
</script>

<style scoped lang="less">
@import '../assets/css/base.less';

  .my-nav-footer-wrap{
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
		padding: 0 0.5rem;
		z-index: 10;
    .my-nav-footer{
			width: 100%;
      height: 3rem;
      display: flex;
      justify-content: space-between;
      .current-music-info{
				width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .current-music-image-wrap{
          border-radius: 50%;
					overflow: hidden;
          img{
						width: 2.4rem;
            height: 2.4rem;
            vertical-align: middle;
          }
        }
        .current-music-info-title{
					max-width: 15rem;
					padding: 0 1rem;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
        }
      }
      .play-controller{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .space{
          width: 1rem;
        }
      }
    }
	}
	.my-songs-list-fixed{
		position:fixed;
		background-color: #fff;
		height: 50%;
		width: 100%;
		bottom: 0;
		z-index: 101;
		border-radius: 8% 8% 0 0;
		padding: 1.5rem 1rem 0 1rem;
		.my-songs-list-wrap{
			display: flex;
			flex-direction: column;
			height: 100%;
			.songs-list-header{
				display: flex;
				justify-content: space-between;
				padding-bottom: 0.5rem;
				border-bottom: 0.02rem solid #eee;
				>span:nth-child(2){
					font-size: large;
				}
			}
			.overflow-wrap{
				height: 100%;
				overflow-y: scroll;
				.songs-list{
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;
					.songs-list-item{
						display: flex;
						justify-content: space-between;
						padding-top: 0.5rem;
						>span{
							color: @lightFontColor;
							font-size: large;
						}
						.song-info{
							display: flex;
							width: 90%;
							align-items: flex-end;
							>span:nth-of-type(3){
								padding: 0 0.3rem;
							}
							.play-icon{
								display: none;
							}
							.song-name{
								display: inline-block;
								max-width: 50%;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}
							.singer{
								display: inline-block;
								font-size: small;
								max-width: 30%;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}
							&.active{
								color: @activeFontColor;
								.play-icon{
									display: inline-block;
									padding-right: 0.5rem;
								}
							}
						}
					}
				}
			}
			
		}
	}

	// 音乐列表滑出动画
	.slide-up-enter,
	.slide-up-leave-to{
		transform: translateY(100%);
	}

	.slide-up-enter-active,
	.slide-up-leave-active{
		transition: transform 0.6s ease-in-out;
	}
</style>