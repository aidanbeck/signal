-Texture Guide-

FOLDERS:

>environment
	ALL ENVIRONMENT SCENES HAVE THE RESOLUTION OF 854x480
	
	-mainscene
		4 frames (includes transition between main and map. should be played in reverse when going from map to main)
			frame 1: Base Scene
			frames 2-4 turn towards turn towards mapscene. play 4, 3, 2 to turn back towards mainscene
		-mainscene_frame0_overlay
			resolution 147x124
	
	-mapscene (wide view of map and lives)
		3 frames
		
		-1: 3 lives
		-2: 2 lives
		-3: 3 lives
	
	-drawmapscene
		1 frame
	
	-tutorialscene
		1 frame

	-computerscene
		1 frame
		-computerscene_screenoverlay
			resolution 436x373
			-computerscene_screenoverlay_vignette
	-launchscene
		13 frames
		-1: Base Scene
		-2: Backspaced Clicked
		-3: 0 Clicked
		-4: 9 Clicked
		-5: 8 Clicked
		-6: 7 Clicked
		-7: 6 Clicked
		-8: 5 Clicked
		-9: 4 Clicked
		-10: 3 Clicked
		-11: 2 Clicked
		-12: 1 Clicked
		-13: Launch Button Clicked
		because these are buttons, the respective clicked frame will display briefly, then the base scene will be displayed again
		-launchscene_screenoverlay
			resolution 67x38
	
	-abilityconsolescene
		4 frames
		-1: Base Scene
		-2: Left Buttoned Clicked
		-3: Enter Button Clicked
		-4: Right Button Clicked
		-abilityconsolescene_screenoverlay
			resolution 200x154
			10 frames
			-1: Long Check
			-2: Lat Check
			-3: 2k Radial Check
			-4: 4k Radial Check
			-5: 8k Radial Check
			-6: Distance Check
			-7: Intersect Check
			-8: Buoy Check
			-9: Heat Check
			-10: Check Submitted
>ui
	-cursorsheet
		resolution 288x32, 9 sprites, each sprite 32x32
		(l>r): cursor, open hand, pointer finger / cursor hovering over clickables, pointer finger tap / cursor click on clickable, pencil, eraser, left arrow, down arrow, right arrow
			each cursor is aligned to the top left corner of the sprite.
			
			each cursor has been split into its own 32x32 file, named as follows (matching order of sheet):
				-cursor
				-hand
				-hand_hover
				-hand_hover_click
				-pencil
				-eraser
				-left
				-down
				-right
	
	-icon (png and ico)
		resolution 48x48

	-realhand
		resolution 340x170, 2 sprites, each sprite 170x170
		(l>r): holding pencil, holding eraser